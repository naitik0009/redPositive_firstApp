import { useState } from 'react';
import {Button, SafeAreaView,View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity,Modal, Image} from 'react-native';

const App = () => {
  const [isVisible,setVisibe] = useState(false);
  const [goal,setGoals] = useState("");
  const [goalList,setList] = useState([]);
  const textHandler = (text)=>{
    setGoals(text);
  };
  const onSubmit=()=>{
    setList((previous)=>{
      return [...previous,{goal,id:Math.random()}];
    });
    setVisibe(false)
    setGoals("");
  }
  
  const deleteHandler=(id)=>{
    setList(goalList.filter(goal=>goal.id !== id));
    
  };

  const toogleModal = ()=>{
    setVisibe(true);
  }
const endModal=()=>{setVisibe(false);}
  return (
    <SafeAreaView style={styles.container}>
<Modal  visible={isVisible} animationType={'slide'}>
<View style={styles.modalContainer}>
<Image style={styles.modalLogo} source={require('./src/assets/goal.png')}/>
<View style={styles.inputContainer}>
        <TextInput value={goal} onChangeText={textHandler} style={styles.textInput} placeholderTextColor={'white'} placeholder='enter your goal'/>
        <Button onPress={onSubmit} title='submit'/>
      </View>
      <Button title='cancel' onPress={endModal}></Button>
</View>
</Modal>
      <View style={styles.goalContainer}>
        <Button title='Add New Goal' onPress={toogleModal}></Button>
        <Text style={{color:'black',fontSize:20,fontWeight:'500'}}>List of goals</Text>
       {/* <ScrollView>
       {goalList.map((goal,index)=>{return (<View style={styles.goalBox} key={index}><Text style={styles.goalBoxText} key={index}>{`${index+1}.  ${goal}`}</Text></View>)})}
       </ScrollView> */}
       <FlatList data={goalList} renderItem={(goal)=>{return (
       <TouchableOpacity style={(press)=>{press && styles.opac}}  onLongPress={deleteHandler.bind(this,goal.item.id)}>
         <View style={styles.goalBox} key={goal.index}><Text style={styles.goalBoxText}>{`${goal.index+1}.  ${goal.item.goal}`}</Text></View>
       </TouchableOpacity>
       )}} />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    padding: 50,
    paddingHorizontal:16,
    
  },
  inputContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:24,


  },
  textInput:{
    borderWidth:1,
    borderColor:'#cccccc',
    width:'70%',
    marginRight:8,
    padding:8,
    color:'white',
  },
  goalContainer:{
    flex:5,
  },
  goalBox:{
    borderWidth:2,
    borderColor:'#cccccc',
    borderRadius:6,
    padding:5,
    margin:5,
  },
  goalBoxText:{
    color:'black',
    fontSize:15,
    fontWeight:'800',
  },
  opac:{
    opacity:0.5,
  },
  modalContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black',
  },
  modalLogo:{
    width:60,
    height:60,
    marginBottom:15,
  }
});
