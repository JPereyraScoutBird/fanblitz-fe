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

function Chatbot(props) {

  const {player = '', pre_prompt = ''} = props
  const [prompt, setPrompt] = useState('')
  const [messageList, setMessageList] = useState([{"role": "assistant", "content": "How can I help you?"}])

  useEffect(() => {
    if(player != '') {
      const newMessage = [...messageList, ({
        "role": "user",
        "content": pre_prompt != '' ? pre_prompt : `${player} mlb baseball player extremely succinct background and obscure/interesting facts output as [background][obscure/interesting facts]`
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
      "content": prompt
    })]
    setMessageList(newMessage); 
    setPrompt('')
    axios.post(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/chat`, {complete_text: newMessage}).then((res) => {
    setMessageList([...newMessage, res.data.response])
    }).catch(err => {
      console.log("Error")
    })
  }

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