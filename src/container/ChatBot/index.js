import React, { useEffect, useState } from 'react';
import './style.css'
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import Images from '../../img';
import axios from 'axios';



/**
 * Custom Chatbot
 * @param {*} args 
 * @returns 
 */
const renderMessages = (message) => {
  // const className = 
  return (
    <div className={`${message.role}`}>
      <p>{message.content}</p>
    </div>
  )
}

const Typing = () => (
  <div className="typing">
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
  </div>
)


function Chatbot(props) {

  const {player = '', pre_prompt = '', gptStyle = ''} = props
  const [prompt, setPrompt] = useState('')
  const [isTyping, setIsTyping] = useState('')
  const [messageList, setMessageList] = useState([{"role": "assistant", "content": "How can I help you?"}])

  const suffix_style = gptStyle == '' ? " " : ` in the style of ${gptStyle}`

  useEffect(() => {
    if(player != '') {
      const newMessage = [...messageList, ({
        "role": "user",
        "content": pre_prompt != '' ? pre_prompt + suffix_style : `${player} mlb baseball player extremely succinct background and obscure/interesting facts output as [background][obscure/interesting facts] ${suffix_style}`
      })]
      setMessageList(newMessage); 
      setPrompt(``)
      axios.post(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/chat`, {complete_text: newMessage}).then((res) => {
      setMessageList([...newMessage, res.data.response])
      }).catch(err => {
        console.log("Error")
      })
    }
  }, [])

  const onSend = (e) => {
    e.preventDefault()
    const newMessage = [...messageList, ({
      "role": "user",
      "content": prompt + suffix_style
    })]
    setMessageList(newMessage); 
    setPrompt('')
    axios.post(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/chat`, {complete_text: newMessage}).then((res) => {
    setMessageList([...newMessage, res.data.response])
    }).catch(err => {
      console.log("Error")
    })
  }
  console.log("asd", suffix_style)
  return (
    <div id="chatbot">
      <div className="container-footer dark">
      <Container>
        <Row>
          <div xs={12} md={4} className='chatbot-container'>
            <div className='chatbot-header'>
              <img src={Images.Logo} />
            </div>
            <div className='chatbot-message'>
              {messageList.length ? messageList.map(x => renderMessages(x)) : null}
              {messageList[messageList.length - 1]['role'] == 'user' ?
              <div>
                {/* <span>"fanblitz bot is typing"</span>  */}
                <div className="typing">
                  <div className="typing__dot"></div>
                  <div className="typing__dot"></div>
                  <div className="typing__dot"></div>
                </div> 
              </div>
              : null }
            </div>
            <div className='chatbot-textinput'>
              <Form onSubmit={(e) => onSend(e)}>
                <Input type='text' placeholder='Please input prompt here..' onChange={(e) => setPrompt(e.target.value)} value={prompt}/>
                <Button onClick={(e) => onSend(e)}>Send</Button>
              </Form>
            </div>
          </div>
        </Row>
      </Container>
      </div>
    </div>
  );
}
export default Chatbot