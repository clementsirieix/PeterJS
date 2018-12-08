import PropTypes from 'prop-types';
import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
    float: right;
    height: 416px;
    margin-bottom: 38px;
    margin-top: 25px;
    position: relative;
    width: 807px;
    overflow: hidden;
`

const Img = styled.img`
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: opacity 0.4s ease;

    ${props => props.isThumbnail && css`
        filter: blur(5px);
        width: 102%;
        height: 102%;
        top: -1%;
        left: -1%;
    `}

    ${props => props.isHidden && css`
        opacity: 0;
    `}
`

export default class Image extends React.Component {

    state = { isLoaded: false }

    componentDidMount() {
        const { src } = this.props
        const buffer = document.createElement('img')
        buffer.onload = () => this.setState({ isLoaded: true })
        buffer.src = src
    }

    render() {
        const { src, thumbnailSrc } = this.props
        const { isLoaded } = this.state
        console.log(isLoaded);

        return (
            <Wrapper>
                <Img src={src} />

                <Img
                    isHidden={isLoaded}
                    isThumbnail
                    src={thumbnailSrc}
                />
            </Wrapper>
        )
    }
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    thumbnailSrc: PropTypes.string.isRequired,
}
