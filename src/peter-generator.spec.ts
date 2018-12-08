import * as fs from 'fs'
import * as path from 'path'
import * as sharp from 'sharp'

import * as peter from './peter-generator'

const buffer = fs.readFileSync(path.join(__dirname, '../public/test.jpg'))

describe('Peter', () => {
    test('should be instanciated with no params', () => {
        const generator = new peter.ThumbnailGenerator()
    })

    test('should be instanciated with custom params', () => {
        const generator = new peter.ThumbnailGenerator({
            maxAttempts: 10,
            maxWidth: 200,
            sizeLimit: '100mB',
        })
    })

    test('should throw error if params are of wrong type', () => {
        const generator: any = new peter.ThumbnailGenerator()

        expect(() => generator.checkPropsType({ maxWidth: 'bar' })).toThrow()
        expect(() => generator.checkPropsType({ sizeLimit: {} })).toThrow()
        expect(() => generator.checkPropsType({ maxAttempts: 'bar' })).toThrow()
    })

    test('should transform the byte size from string/number to number', () => {
        const generator: any = new peter.ThumbnailGenerator()

        expect(generator.harmonizeByteSize(1000)).toBe(1000)
        expect(generator.harmonizeByteSize('1000')).toBe(1000)
        expect(generator.harmonizeByteSize('1kb')).toBe(1024)
        expect(generator.harmonizeByteSize('1kB')).toBe(1024)
        expect(generator.harmonizeByteSize('1.89kB')).toBe(1024)
        expect(generator.harmonizeByteSize('1mB')).toBe(1048576)
        expect(generator.harmonizeByteSize('1gB')).toBe(1073741824)
    })

    test('should throw an error if generate type is invalid', () => {
        const generator: any = new peter.ThumbnailGenerator()

        expect(() => generator.generate('foo')).toThrow()
    })

    test('should generate a Buffer if successful', () => {
        const generator = new peter.ThumbnailGenerator()

        expect.assertions(1)
        return generator.generate(buffer)
            .then(res => expect(Buffer.isBuffer(res)).toBeTruthy())
    })

    test('should not generate thumbnail if exceeding the maxAttempts number of resize', () => {
        const generator = new peter.ThumbnailGenerator({
            sizeLimit: 1,
            maxAttempts: 5,
        })

        expect.assertions(1)
        return generator.generate(buffer)
            .catch(err => expect(err).toMatch('Number of attempts exceeded, failed to generate thumbnail'))
    })

    test('should generate thumbnail that weight less than the limit options', () => {
        const sizeLimit = 1000
        const generator = new peter.ThumbnailGenerator({
            sizeLimit,
            maxAttempts: 10,
        })

        expect.assertions(1)
        return generator.generate(buffer)
            .then(res =>
                sharp(res).metadata()
                    .then(({ size }) => expect(size).toBeLessThanOrEqual(sizeLimit))
            )
    })

    test('should generate thumbnail that match baseWidth option', () => {
        const maxWidth = 50
        const generator = new peter.ThumbnailGenerator({
            maxWidth,
            sizeLimit: '1mB',
            maxAttempts: 10,
        })

        expect.assertions(1)
        return generator.generate(buffer)
            .then(res =>
                sharp(res).metadata()
                    .then(({ width }) => expect(width).toBe(maxWidth))
            )
    })
})

