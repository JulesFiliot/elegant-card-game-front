import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react'

const HomeButton=(props) =>{
    return (
        <Card>
            <Image src={props.img_src} wrapped ui={false} />
            <Card.Content>
                <Card.Description>
                {props.surname} {props.lastname} #{props.id}
                </Card.Description>
            </Card.Content>
        </Card>

        );
    }

export default HomeButton;