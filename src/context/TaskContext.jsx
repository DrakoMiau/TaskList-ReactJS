import { createContext, useState, useEffect} from "react";
import { tasks as data } from "../data/task";
export const TaskContext = createContext();

export function TaskContextProvider(props) {
    //con este nombre le indicamos a React que sera el componente que almacena el resto de componentes

    const [tasks, setTasks] = useState([]);

    function createTask(task) {
        setTasks([
            ...tasks,
            {
                title: task.title,
                id: tasks.length,
                description: task.description,
            },
        ]);
    }

    useEffect(() => {
        setTasks(data);
    }, []);

    function deleteTask(taskID) {
        setTasks(tasks.filter((task) => task.id !== taskID));
    }

    return (
        <TaskContext.Provider
            value={{
                tasks: tasks,
                deleteTask: deleteTask,
                createTask: createTask,
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
}

export default TaskContext;
