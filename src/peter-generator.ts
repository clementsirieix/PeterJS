import * as _sharp from 'sharp'
const sharp = _sharp

import { Generator, Options, ResizeParams } from 'peter-generator.types'

const defaultOpts: Options = {
    maxAttempts: 5,
    maxWidth: 70,
    sizeLimit: '100kB',
}

export class ThumbnailGenerator implements Generator {

    private maxAttempts: number
    private maxWidth: number
    private sizeLimit: number

    constructor(opts: Options = {}) {
        try {
            this.checkPropsType(opts)
        }
        catch(e) {
            console.error(e)
        }
        const mergedOpts = { ...defaultOpts, ...opts }
        this.maxAttempts = mergedOpts.maxAttempts
        this.maxWidth = mergedOpts.maxWidth
        this.sizeLimit = this.harmonizeByteSize(mergedOpts.sizeLimit)
    }

    private checkPropsType(opts: Options): void {
        if (opts.maxWidth && typeof opts.maxWidth !== 'number') {
            throw new Error('The maxWidth option should be of type number')
        }
        if (opts.sizeLimit && typeof opts.sizeLimit !== 'string' && typeof opts.sizeLimit !== 'number') {
            throw new Error('The sizeLimit option should be of type string or number')
        }
        if (opts.maxAttempts && typeof opts.maxAttempts !== 'number') {
            throw new Error('The maxAttempts option should be of type number')
        }
    }

    private harmonizeByteSize(size: string | number): number {
        if (typeof size === 'number') {
            return Math.floor(size)
        }
        const match = size.trim().match(/(-?\d*(?:\.\d+)?)\s*(\D*)/)

        if (!match[1]) {
            throw new Error('The numerical value of limit is missing')
        }
        if (match[2] && !match[2].match(/^(kB|MB|GB)$/i)) {
            throw new Error('The unit value of limit is not valid (expected: kB, MB, GB)')
        }
        const value = parseInt(match[1], 10)

        return Math.floor(
            match[2].toLowerCase() === 'gb' ?
                value * 1073741824
            :
            match[2].toLowerCase() === 'mb' ?
                value * 1048576
            :
            match[2].toLowerCase() === 'kb' ?
                value * 1024
            :
                value
        )
    }

    private resize(img: _sharp, opts: ResizeParams) {
        img.metadata()
            .then(({ height, size, width }) => {
                if (size <= this.sizeLimit) {
                    img.toBuffer()
                        .then(opts.onSuccess)
                        .catch(opts.onFail)
                } else if (opts.attemptN && opts.attemptN > this.maxAttempts) {
                    opts.onFail('Number of attempts exceeded, failed to generate thumbnail')
                } else {
                    const nextWidth = opts.width || this.maxWidth

                    return img.resize(Math.floor(nextWidth), Math.floor(nextWidth / (opts.ratio || width / height)))
                        .toBuffer()
                        .then(data => {
                            this.resize(sharp(data), {
                                    ...opts,
                                    attemptN: opts.attemptN ? opts.attemptN + 1 : 1,
                                    width: nextWidth / 1.5,
                                }
                            )
                        })
                }
            })
            .catch(opts.onFail)
    }

    public generate(input: Buffer): Promise<Buffer> {
        if (!Buffer.isBuffer(input)) {
            throw new Error('The generate method expects an input of type Buffer')
        }
        const img = sharp(input)

        return new Promise((resolve, reject) => {
            this.resize(img, {
                onSuccess: resolve,
                onFail: reject,
            })
        })
    }
}
