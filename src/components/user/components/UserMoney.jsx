import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

const UserMoney=(props) =>{
    return (
        <Card>
            <Card.Content>
                    <a>
                        Solde : &nbsp; {props.solde} &nbsp;
                        <Icon name='money bill alternate outline' />
                        {props.money} $
                    </a>
            </Card.Content>
        </Card>

        );
    }

export default UserMoney;