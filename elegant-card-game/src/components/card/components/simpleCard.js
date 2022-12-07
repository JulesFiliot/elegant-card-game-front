import React from 'react';
import { Card, Image } from 'semantic-ui-react'

 export const UserSimpleDisplay=(props) =>{
    return (
        <Card>
            <Image src='"/images/avatar2/large/kristy.png"' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.surname} {props.lastname} </Card.Header>
                <Card.Meta>
                    <span className='date'>login: {props.login}</span>
                </Card.Meta>
                <Card.Description>
                    User In DataBase
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                    <a>
                        <Icon name='money bill alternate outline' />
                            {props.money} $
                    </a>
            </Card.Content>
        </Card>

        );
    }
