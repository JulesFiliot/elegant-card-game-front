import React from 'react';
import { User, Image } from 'semantic-ui-react'

 export const SimpleUser=(props) =>{
    return (
        <User>
            <Image src='"/images/avatar2/large/kristy.png"' wrapped ui={false} />
            <User.Content>
                <User.Header>{props.surname} {props.lastname} </User.Header>
                <User.Meta>
                    <span className='date'>login: {props.login}</span>
                </User.Meta>
                <User.Description>
                    User In DataBase
                </User.Description>
            </User.Content>
            <User.Content extra>
                    <a>
                        <Icon name='money bill alternate outline' />
                            {props.money} $
                    </a>
            </User.Content>
        </User>

        );
    }
