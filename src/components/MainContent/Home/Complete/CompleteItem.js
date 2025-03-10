import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'

export default function CompleteItem(props) {
    let markIncomplete = () => {
       let copy = props.item;
       copy.status = 0;
       props.complete(copy);
    }
    let deleteItem = () => {
        let copy = props.item;
        props.delete(copy, 1);
    }
    let timeDiff = () => {
        let dateCreated = props.item.dateCreated;
        let dateCompleted = props.item.dateCompleted;
        let timeCreated = props.item.timeCreated;
        let timeCompleted = props.item.timeCompleted;
        let d1 = dateCreated.split('/');
        let d2 = dateCompleted.split('/');
        let t1 = timeCreated.split(':');
        let t2 = timeCompleted.split(':');

        let date1 = new Date(d1[2], d1[0] - 1, d1[1], t1[0], t1[1], t1[2]);
        let date2 = new Date(d2[2], d2[0] - 1, d2[1], t2[0], t2[1], t2[2]);
        let diff = date2.getTime() - date1.getTime();

        let output = '';
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if(days > 0){
            diff -= days * (1000 * 60 * 60 * 24);
            output += days + " day";
            output += days > 1 ? "s " : " ";
        }

        let hours = Math.floor(diff / (1000 * 60 * 60));
        if(hours > 0){
            diff -= hours * (1000 * 60 * 60);
            output += hours + " hour";
            output += hours > 1 ? "s " : " ";
        } 

        let mins = Math.floor(diff / (1000 * 60));
        if(mins > 0) {
            diff -= mins * (1000 * 60);
            output += mins + " min";
            output += mins > 1 ? "s " : " ";
        }

        let secs = Math.floor(diff / 1000);
        output += secs + " sec";
        return secs > 1 ? output += "s" : output;
    };
    let subtasks;
    if(props.item.subtasks !== undefined && props.item.subtasks.length > 0){
        subtasks = (
            <div className='subtask-container'>
                <h6>Sub-Tasks</h6>
                {props.item.subtasks.map((sub) => {
                    return (
                        <div className='subcomplete-item' key={sub.id}>
                            <div className='subcomplete-header'>
                            <input type='checkbox' checked={sub.status === 1 ? true : false} readOnly={true} />
                            <div className='small-spacer'></div>
                            <span>{sub.title}</span>
                            </div>
                        </div>
                    )
                })}
            </div> 
        )
    }
    let priority;
    if(props.item.priority === 0){
        priority = <div className='list-item-priority' style={{backgroundColor: '#EBEDEF'}}></div>
    } else if(props.item.priority === 1){
        priority = <div className='list-item-priority' style={{backgroundColor: '#93D8EE'}}></div>
    } else{
        priority = <div className='list-item-priority' style={{backgroundColor: '#FE7979'}}></div>
    }
    return (
        <Card>
            <Accordion.Toggle className='complete-item-header' as={Card.Body} eventKey={props.item.id}>
                <div className='complete-item-content'>
                    {priority}
                    <div className='small-spacer'></div>
                    <div className='small-spacer'></div>
                    <div className='complete-item-header-content'>
                        <h3>{props.item.title}</h3>
                        <span>{props.item.dateCompleted}</span>
                    </div>
                </div>
                <Button variant='outline-secondary' onClick={markIncomplete} className='list-item-btn'>Mark Incomplete</Button>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.item.id}>
                <Card.Body>
                    <Button variant='danger' className='complete-clear-btn' onClick={deleteItem}>Delete Task</Button>
                    <div className='vertical-spacer'></div>
                    <div className='complete-item-content-header'>
                        <h6>Date Created: </h6>
                        <div className='small-spacer'></div>
                        <span>{props.item.dateCreated}</span>
                    </div>
                    <div className='complete-item-content-header'>
                        <h6>Duration: </h6>
                        <div className='small-spacer'></div>
                        <span>{timeDiff()}</span>
                    </div>
                    {subtasks}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}
