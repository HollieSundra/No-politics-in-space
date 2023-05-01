import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ewokcute from '../assets/img/ewokcute.png';
import ewokcute1 from '../assets/img/ewokcute.png';

import jedi from '../assets/img/jedi.jpg';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    
  }

  const styles = StyleSheet.create({
    rightArrow: {
      position: "absolute",
      backgroundColor: "#0078fe",
      //backgroundColor:"red",
      width: 20,
      height: 25,
      bottom: 0,
      borderBottomLeftRadius: 25,
      right: -10
    },
    
    rightArrowOverlap: {
      position: "absolute",
      backgroundColor: "#eeeeee",
      //backgroundColor:"green",
      width: 20,
      height: 35,
      bottom: -6,
      borderBottomLeftRadius: 18,
      right: -20
    
    },
    
    /*Arrow head for recevied messages*/
    leftArrow: {
        position: "absolute",
        backgroundColor: "#dedede",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },
    
    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: "#eeeeee",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20
    
    },
    });
  
  

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
      <img src={ewokcute} alt="" className="ewok"/>
      <img src={ewokcute1} alt="" className="ewok1"/>
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">We would be honored if you would join us.</h4>
          <div className="card-body">
          
            {data ? (
              <p>
                Success! {' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Enter Your Jedi Name"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Enter Your Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='pics'>
      <img src={jedi} alt="" className="jedi"/>
      </div>
    </main>
  );
};







<FlatList

style={{backgroundColor:"#eeeeee"}}
data={this.state.chat_log}
ref={ref => (this.FlatListRef = ref)} // assign the flatlist's ref to your component's FlatListRef...


renderItem = {({item,index})=>{

  rowId={index}
 
    if (SENT_MESSAGE) { //change as per your code logic

  
      
        return (

          <View style={{
            backgroundColor: "#0078fe",
            padding:10,
            marginLeft: '45%',
            borderRadius: 5,
           
            marginTop: 5,
            marginRight: "5%",
            maxWidth: '50%',
            alignSelf: 'flex-end',
            borderRadius: 20,
          }} key={index}>

            
            <Text style={{ fontSize: 16, color: "#fff", }} key={index}> {item.text}</Text>

              <View style={styles.rightArrow}>

              </View>
              <View style={styles.rightArrowOverlap}></View>
            
            
            
          </View>
        )

      
      
      
    } else {

      
        return (
          <View style={{
            backgroundColor: "#dedede",
            padding:10,
            borderRadius: 5,
            marginTop: 5,
            marginLeft: "5%",
            maxWidth: '50%',
            alignSelf: 'flex-start',
            //maxWidth: 500,
            //padding: 14,
            
            //alignItems:"center",
            borderRadius: 20,
          }} key={index}>

            
              
              <Text style={{ fontSize: 16, color: "#000",justifyContent:"center" }} key={index}> {item.text}</Text>
              <View style={styles.leftArrow}>

              </View>
              <View style={styles.leftArrowOverlap}></View>
            
            
            
          </View>
        )
      
      
    }
    
  

}}

keyExtractor={(item,index)=>index.toString()}
/>


export default Signup;
