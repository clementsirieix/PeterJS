import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import Image from './components/Image'

const Wrapper = styled.div`
    margin: 41px 83px;
`
const Title = styled.div`
    font-size: 36px;
    line-height: 41px;
    font-family: 'Playfair Display', serif;
    color: #00F;
`

const MenloWrapper = styled.span`
    font-family: "Menlo", monospace;

    ${props => props.isTitle && css`
        font-weight: bold;
    `}

    ${props => props.withBackground && css`
        display: inline-block;
        position: relative;

        :before {
            background-color: #EDEDFA;
            content: "";
            box-sizing: border-box;
            position: absolute;
            top: 2px;
            left: -2px;
            right: -2px;
            bottom: 2px;
            z-index: -1;
            border-radius: 2px;
        }
    `}
`

const HeaderParagraph = styled.div`
    color: #212121;
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    line-height: 32px;
    max-width: 923px;
    margin-top: 14px;
`
const Hyperlink = styled.a`
    color: #212121;
    text-decoration: underline;
    font-style: none;
    transition: color 0.1s ease;

    :hover {
        color: #00CDFF;
    }
`

const SecondTitle = styled.div`
    clear: both;
    font-size: 24px;
    line-height: 28px;
    margin: 24px 0;
    font-family: 'Playfair Display', serif;
    color: #00F;
`

const Paragraph = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    line-height: 28px;
    color: #212121;
    max-width: 1040px;
`

const CodeBlockWrapper = styled.div`
    border-radius: 2px;
    background-color: #EDEDFA;
    color: #212121;
    font-family: "Menlo", monospace;
    margin: 10px 0;
    padding: 10px;
    max-width: 1040px;
`

const Footer = styled.div`
    color: #666;
    margin-top: 36px;
    font-size: 11px;
    width: 100%;
    text-align:center;
    font-family: 'Montserrat', sans-serif;
`

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Title>
            <MenloWrapper isTitle>#</MenloWrapper> PeterJS
        </Title>

        <HeaderParagraph>
            PeterJS helps you generate thumbnails of images in your node app, keeping the quality of original pictures while improving your queries response time. You can find the repo of the project on <Hyperlink href="https://github.com/clementsirieix/PeterJS" target="_blank">Github</Hyperlink>.
        </HeaderParagraph>

        <Image
            src={process.env.PUBLIC_URL + '/ex.png'}
            thumbnailSrc={process.env.PUBLIC_URL + '/result.png'}
        />

        <SecondTitle>
            <MenloWrapper isTitle>##</MenloWrapper> API
        </SecondTitle>

        <Paragraph>
            Peter is the entry point to the peter-generator library. You can import the library through: <br />
            - a  <MenloWrapper withBackground>&lt;script&gt;</MenloWrapper> tag making <MenloWrapper withBackground>Peter</MenloWrapper> a global <br />
            - ES6 with npm <MenloWrapper withBackground>import {"{"} ThumbnailGenerator {"}"} from 'peter-generator'</MenloWrapper> <br />
            - ES5 with npm <MenloWrapper withBackground>var peter = require('peter-generator')</MenloWrapper> <br />
            <br />
            First you will need to initialize an instance of <MenloWrapper withBackground>Peter</MenloWrapper> in order to generate the thumbnails: <br />
        </Paragraph>

        <CodeBlockWrapper>
            const gen = new ThumbnailGenerator()
        </CodeBlockWrapper>

        <Paragraph>
            You can pass additional parameters to the constructor like so: <br />
        </Paragraph>

        <CodeBlockWrapper>
            new ThumbnailGenerator({"{"} <br />
                &emsp;&emsp;maxAttempts: 10, <br />
                &emsp;&emsp;maxWidth: 90, <br />
                &emsp;&emsp;sizeLimit: '150kB', <br />
            {"}"})
        </CodeBlockWrapper>

        <Paragraph>
            <MenloWrapper withBackground>maxAttempts</MenloWrapper> number, tell the instance how many tries the generation process will allow per query. <br />
            <MenloWrapper withBackground>maxWidth</MenloWrapper> number, the instance will try to get a thumbnail matching this width (keeping the original ratio) and go smaller with each attempt. <br />
            <MenloWrapper withBackground>sizeLimit</MenloWrapper> number | string, a number of bytes or a string of format <MenloWrapper withBackground>%dkB</MenloWrapper> telling the instance the maximum thumbnail size tolerated. <br />
            <br />
            You can then use your instance by doing: <br />
        </Paragraph>

        <CodeBlockWrapper>
            gen.generate(input) <br />
            &emsp;&emsp;.then(result => {"{"} <br />
            &emsp;&emsp;&emsp;&emsp;// ... <br />
            &emsp;&emsp;{"}"})
        </CodeBlockWrapper>

        <Paragraph>
            The <MenloWrapper withBackground>input</MenloWrapper> argument is of type <Hyperlink href="https://nodejs.org/api/buffer.html" target="_blank">Buffer</Hyperlink>. <br />
            The method returns a <MenloWrapper withBackground>Promise</MenloWrapper> that will provide a <MenloWrapper withBackground>Buffer</MenloWrapper> when resolved. <br />
            <br />
            Example of handling a <MenloWrapper withBackground>Buffer</MenloWrapper> with a base64 string: <br />
        </Paragraph>

        <CodeBlockWrapper>
            gen.generate(Buffer.from(uri, 'base64')) <br />
            &emsp;&emsp;.then(result => {"{"} <br />
            &emsp;&emsp;&emsp;&emsp;const base64 = result.toString('base64') <br />
            &emsp;&emsp;&emsp;&emsp;// ... <br />
            &emsp;&emsp;{"}"})
        </CodeBlockWrapper>

        <SecondTitle>
            <MenloWrapper isTitle>##</MenloWrapper> Issues
        </SecondTitle>

        <Paragraph>
            If you are facing any issues with the library you can report them on <Hyperlink href="https://github.com/clementsirieix/PeterJS/issues" target="_blank">Github</Hyperlink>.
        </Paragraph>

        <Footer>
            2018 - Clément Sirieix
        </Footer>
    </Wrapper>
    )
  }
}

export default App
