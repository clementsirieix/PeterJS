/**
 * A generator is an object that allow the user to call a generate method.
 * Several instances can be used to handle different use cases.
 */
export interface Generator {
    /**
     * Process a buffer.
     *
     * @param input A buffer that will be processed
     *
     * @returns a promise that will resolve a thumbnail Buffer keeping similarities with the original input
     */
    generate: (input: Buffer) => Promise<Buffer>,
}

/**
 * An object defining extra options that can be passed to the thumbnail generator constructor.
 * maxAttempts (optional, default: 5) represents the number of tries the generator will attempt to reduce the size of the thumbnail
 * maxWidth (optional, default: 70) represents the maximum width in px (keeping the initial image ratio) of the generated thumbnail
 * sizeLimit (optional, default: '100kB') represents the maximum tolerated thumbnail size in bytes.
 */
export interface Options {
    maxAttempts?: number,
    maxWidth?: number,
    sizeLimit?: string | number,
}

/**
 * An object used internally while resizing the image.
 */
export interface ResizeParams {
    attemptN?: number,
    onFail: (err: any) => void,
    onSuccess: (res: any) => void,
    ratio?: number,
    width?: number,
}
