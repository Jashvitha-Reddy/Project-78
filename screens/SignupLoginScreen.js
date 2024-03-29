import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, ScrollView  } from 'react-native';
import db from '../config' ;
import firebase from 'firebase';

export default class SignupLoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            uername: '',
            password: '',
            firstName: '',
            lastName:'',
            phoneNumber:'',
            address:'',
            emailId:'',
            password:'',
            confirmPassword:''
           
    }
    
    userLogin = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then(() => {
                return Alert.alert("sucusessfully login")

            })
            .catch(function (error) {
                var errorcode = error.code
                var errormessage = error.errormessage
                return Alert.alert(errormessage)
            })
    }
    userSignup=(username,password,confirmPassword)=>{
        if(password !== confirmPassword){
            return Alert.alert("password does not match/please check and enter again")
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(username,password)
            .then((response)=>{
                db.collection('users').add({
                    first_Name: this.state.firstName,
                        last_Name: this.state.lastName,
                        phone_number: this.state.phoneNumber,
                        email_Id: this.state.emailId,
                        address: this.state.address

                })
            }
            )
        return Alert.alert(
            'User Added Successfully',
            " ",
            [
                {text:'OK',onPress:()=> this.setState({"isVisible":false})}
            ]
            )
            .catch((error)=>{
                var errorCode=error.code;
                var errorMessage=error.message;
                return Alert.alert(errorMessage)
            })

    }
}
    showModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        <KeyboardAvoidingView style={styles.keyBoardAvoidingView}>
                            <Text style={styles.modalTittle}>
                                Resgistration
                               </Text>
                            <TextInput style={styles.formTextInput}
                                placeholder={"firstName"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({ firstName: text })
                                }}
                            />
                            <TextInput style={styles.formTextInput}
                                placeholder={"lastName"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({ lastName: text })
                                }}
                            />

                            <TextInput style={styles.formTextInput}
                                placeholder={"phoneNumber"}
                                maxLength={10}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    this.setState({ contact: text })
                                }}
                            />

                            <TextInput style={styles.formTextInput}
                                placeholder={"address"}
                                multiline={true}
                                onChangeText={(text) => {
                                    this.setState({ address: text })
                                }}
                            />

                            <TextInput style={styles.formTextInput}
                                placeholder={"emailId"}
                                keyboardType={'email-address'}
                                onChangeText={(text) => {
                                    this.setState({ emailId: text })
                                }}
                            />

                            <TextInput style={styles.formTextInput}
                                placeholder={"password"}
                                secureTextEntry={'true'}
                                onChangeText={(text) => {
                                    this.setState({ password: text })
                                }}
                            />

                            <TextInput style={styles.formTextInput}
                                placeholder={"confirmPassword"}
                                secureTextEntry={'true'}
                                onChangeText={(text) => {
                                    this.setState({ confirmPassword: text })
                                }}
                            />

                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={styles.resgisterButton}
                                    onPress={() => this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}
                                >
                                    <Text style={styles.resgisterButtonText}>Resgister</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={styles.cancelButton}
                                    onPress={() => this.setState({ "isVisible": false })}
                                >
                                    <Text style={{ color: '#ff5722' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>

        )
    
    render(){
        return(
            <View>
                 <Text style={{color:'#ff5772',fontSize:18,fontWeight:'bold',marginLeft:55}}>USERNAME</Text>
                 <View style={{alignItems:'center'}}></View>
                 {this.showModal()}
                 <TextInput
                 style={styles.loginBox}
                 keyboardType='email-address'
                 onChangeText={(text)=>{
                     this.setState({
                         username:text
                     })
                 }}
                 />
                 <TextInput
                    style={styles.loginBox}
                    placeholder="enter password"
                    secureTextEntry={true}
                    placeholderTextColor="#fff"
                    onChangeText={(text => {
                        this.setState({
                            password: text
                        })
                    })}
                />
                 <View style={{alignItems:'center'}}>
                     <TouchableOpacity 
                        style={[styles.button,{marginBottom:10}]}
                         onPress={()=>{this.userLogin(this.state.username,this.state.password)}}>
                             <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>LOGIN</Text>
                     </TouchableOpacity>

                 </View>
                 <View style={{alignItems:'center'}}>
                     <TouchableOpacity 
                        style={[styles.button,{marginBottom:10}]}
                         onPress={()=>{this.userSignup(this.state.username,this.state.password)}}>
                             <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>SIGNUP</Text>
                     </TouchableOpacity>

                 </View>
                </View>
                 
           
        )
    }}

const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: "#ff9800",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8, },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
    },
    formTextInput:{ 
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10 
    },
    registerButton:{ 
        width:200, 
        height:40, 
        alignItems:'center', 
        justifyContent:'center', 
        borderWidth:1, 
        borderRadius:10, 
        marginTop:30 
    },
    registerButtonText:{ 
        color:'#ff5722', 
        fontSize:15, 
        fontWeight:'bold' 
    },
    cancelButton:{ 
        width:200,
         height:30, 
         justifyContent:'center', 
         alignItems:'center', 
         marginTop:5
         },
         modalTitle: { 
            justifyContent: 'center', 
            alignSelf: 'center', 
            fontSize: 30, 
            color: '#ff5722', 
            margin: 50 },
        modalContainer: { 
            flex: 1, 
            borderRadius: 20, 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: "#ffff", 
            marginRight: 30,
             marginLeft: 30, 
             marginTop: 80, 
             marginBottom: 80
             },
             KeyboardAvoidingView: { 
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center' 
            }
})

