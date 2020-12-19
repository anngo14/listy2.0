import React from 'react'
import { Accordion, Card } from 'react-bootstrap'

export default function CompleteItem(props) {
    let subtasks;
    if(props.item.subtasks !== undefined && props.item.subtasks.length > 0){
        subtasks = (
            <div>
                <h6>Sub-Tasks</h6>
                {props.item.subtasks.map((sub) => {
                    return (
                        <div className='subcomplete-item' key={sub.id}>
                            <div className='subcomplete-header'>
                            <input type='checkbox'/>
                                <div className='small-spacer'></div>
                                <span>{sub.title}</span>
                            </div>
                        </div>
                    )
                })}
            </div> 
        )
    }
    return (
        <Card>
            <Accordion.Toggle className='complete-item-header' as={Card.Body} eventKey={props.item.id}>
                <div>
                    <h3>{props.item.title}</h3>
                    <span>{props.item.dateCompleted}</span>
                </div>
                <span>Mark Incomplete</span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.item.id}>
                <Card.Body>
                    <div className='complete-item-content-header'>
                        <h6>Duration: </h6>
                        <div className='small-spacer'></div>
                        <span>Calculated Time Diff</span>
                    </div>
                    {subtasks}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}
