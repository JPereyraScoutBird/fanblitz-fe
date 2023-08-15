import React, { useEffect, useState } from 'react';
import './style.css'
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import Images from '../../img';
import axios from 'axios';
import useWebSocket, { ReadyState } from 'react-use-websocket';

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

  const {player = '', pre_prompt = ''} = props
  const [prompt, setPrompt] = useState('')
  const [isTyping, setIsTyping] = useState('')
  const [socketUrl, setSocketUrl] = useState('wss://sfiwzuyyr4.execute-api.us-east-1.amazonaws.com/dev');
  const [messageList, setMessageList] = useState([{"role": "assistant", "content": "How can I help you?"}])

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if(player != '') {
      const newMessage = [...messageList, ({
        "role": "user",
        "content": pre_prompt != '' ? pre_prompt : `${player} mlb baseball player extremely succinct background and obscure/interesting facts output as [background][obscure/interesting facts]`
      })]
      setMessageList(newMessage); 
      sendMessage(JSON.stringify({complete_text: newMessage}))
      setPrompt(``)
      // axios.post(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/chat`, {complete_text: newMessage}).then((res) => {
      // setMessageList([...newMessage, res.data.response])
      // }).catch(err => {
      //   console.log("Error")
      // })
    }
  }, [])

  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data != ""){
        const new_data = JSON.parse(lastMessage.data)
        console.log("klok menol", new_data.response)
        messageList[messageList.length - 1] = new_data.response
        setMessageList(messageList)
        // setMessageList((prev) => prev.concat(new_data.response));
      }
    }
  }, [lastMessage, setMessageList]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const onSend = (e) => {
    e.preventDefault()
    const newMessage = [...messageList, ({
      "role": "user",
      "content": prompt
    })]
    setMessageList(newMessage); 
    sendMessage(JSON.stringify({complete_text: newMessage}))
    setMessageList([...newMessage, ""]); 
    setPrompt('')
    // axios.post(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/chat`, {complete_text: newMessage}).then((res) => {
    // setMessageList([...newMessage, res.data.response])
    // }).catch(err => {
    //   console.log("Error")
    // })
  }
  console.log("asd", messageList[messageList.length - 1]['role'])
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