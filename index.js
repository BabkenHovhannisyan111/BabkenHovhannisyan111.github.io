const root = document.getElementById("root")

function TodoForm(add){
let container=document.createElement("form")
container.innerHTML=`
<input type="text" placeholder="text" />
<button>Add</button>

`
container.addEventListener("submit",(e)=>{
    e.preventDefault()
    const value = container.querySelector("input").value
    

    add(value)
})

return container
}
function List(todos,Change){
    let container=document.createElement("div")
    todos.map((todo)=>{
        return ListItem(todo,(change)=>{
            todo.completed=change
            Change()
        })
    }).forEach((el)=>{
      return  container.appendChild(el)

    })
    
    
    
    return container
}
function ListItem(todo,Change){
    let container=document.createElement("div")
    container.innerHTML=`
    <label>
    <input type="checkbox" ${todo.completed ? "checked" : "" } />
    ${todo.label}
    </label>
    `
    let inp= container.querySelector("input")
    inp.addEventListener("change", (e)=> {
        Change(e.target.checked)
    })
    return container
}
function TodoFooter(todos,change){
    let container=document.createElement("div")
    let completed = todos.filter((todo)=>todo.completed===true).length
    container.innerHTML=`
    <span>${completed}/${todos.length} Completed</span>
    <button  >Clear Completed</button>
    `
    let btn=container.querySelector("button")
    btn.addEventListener("click", ()=>{
       
        change(todos.filter((todo)=>todo.completed === false ))
        
    })

    return container
}


function App(){
    
    let todos=[
        {label:"Learn Js",completed:false},
        {label:"Learn Css",completed:false},
        {label:"Learn HTML",completed:false}
    ]
    let container=document.createElement("div")
    function render(){
        container.innerHTML=""
    container.appendChild(TodoForm(function(newText){
            todos.push({
                label:newText,
                completed:false

            })
            render()
        }    
        ))
        container.appendChild(List(todos,()=>{
            render()

        }))
        container.appendChild(TodoFooter(todos,(newtodo)=>{
            todos=newtodo
            render()
        }))


    }
    render()
    
    return container
}
root.appendChild(App())