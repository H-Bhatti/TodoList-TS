import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";


figlet('TodoList!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.green(data))
});





let todoList : string[] = [];

async function RepeatFlow(){
    const answer = await inquirer.prompt([{
        name:"repeat",
        type:"list",
        choices:["yes","no"],
        message:"anothe operation?"
    }]);

    return(answer.repeat==="yes")?true:false;
}

async function TodoList() {

    let startAgain = true;
   do{
        const answer:{option:string} = await inquirer.prompt([{
        name:"option",
        type:"list",
        choices:["Add Item","Display","Remove Item","End"],
        message:"What Do You Want To Do?"
    }])

    if (answer.option == "Add Item"){
        const item = await inquirer.prompt([{
            name:"NewItem",
            type:"input",
            message:"Enter Item"
        }]);

        todoList.push(item.NewItem)
        startAgain = await RepeatFlow()
        
        
    }else if(answer.option == "Display"){
        if (todoList.length == 0){
            console.log(chalk.red("Your List is Empty, Please add an item"))
        }
        todoList.forEach(element => console.log(element));
        startAgain = await RepeatFlow()
        
        
    }else if(answer.option == "Remove Item"){
        if (todoList.length == 0){
            console.log(chalk.red("Your List is Empty, Please add an item"))
        }
        // remove Item
        const removeItem = await inquirer.prompt([{
            name:"NewItem",
            type:"input",
            message:"Which Item you want to remove?"
        }]);


        todoList.forEach((element,index) =>{

            if(element.toLowerCase===removeItem.toLowerCase){
                console.log(todoList[index])
                todoList.splice(index,1)
            }
        })
        

    }else if (answer.option == "End"){
        startAgain = false;
    }
}while(startAgain);
    console.log("BYE ! ! ! !")
}

setTimeout(()=>{
    TodoList();
},50)
