import React, { useEffect, useState } from 'react';
import './style.css'
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import Images from '../../img';
import axios from 'axios';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
  setSendPromt,
  selectSendPromt,
} from '../../reducers/sendPromt';
import { useSelector, useDispatch } from 'react-redux';

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

  const {player = '', pre_prompt = '', gptStyle = '', sportLeague = 'mlb', sportPlayer = 'baseball'} = props
  const sendPromtReducer = useSelector(selectSendPromt);
  const dispatch = useDispatch();
  const [sendPromt, setSendPromtState] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [socketUrl, setSocketUrl] = useState('wss://sfiwzuyyr4.execute-api.us-east-1.amazonaws.com/dev');
  const [messageList, setMessageList] = useState([{"role": "assistant", "content": "How can I help you?"}])

  const suffix_style = gptStyle == '' ? " " : ` in the style of ${gptStyle}`
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    let sendPromtLocal = false
    if (messageList.length == 1 && player != '') {
      const newMessage = [...messageList, ({
        "role": "user",
        "content": pre_prompt != '' ? pre_prompt + suffix_style : `${player} ${sportLeague} ${sportPlayer} player extremely succinct background and obscure/interesting facts output as [background][obscure/interesting facts] ${suffix_style}`
      })]
      setSendPromtState(true)
      dispatch(setSendPromt(true))
      sendPromtLocal = true
      setMessageList([...newMessage, ""]);
      sendMessage(JSON.stringify({complete_text: newMessage})) 
      setPrompt('')
    }
    else if (lastMessage !== null) {
      dispatch(setSendPromt(true))
      setSendPromtState(true)
      if (lastMessage.data != ""){
        const new_data = JSON.parse(lastMessage.data)
        messageList[messageList.length - 1] = new_data.response
        setMessageList(messageList)
      }
    }
    else{
      dispatch(setSendPromt(false))
      setSendPromtState(false)
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
      "content": prompt + suffix_style
    })]
    console.log("MESSAGE 2")
    setMessageList(newMessage); 
    sendMessage(JSON.stringify({complete_text: newMessage}))
    setMessageList([...newMessage, ""]); 
    setPrompt('')
  }
  // console.log("asd", suffix_style)
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