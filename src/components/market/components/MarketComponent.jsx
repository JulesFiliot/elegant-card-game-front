import React from 'react';
import Card from '../../card/containers/Card';
//import { Card, Image, Icon } from 'semantic-ui-react'
//import 'semantic-ui-css/semantic.min.css'

//WIP

componentDidMount( () => {
    //setPage("pages")
    let context = {method: 'GET'}
    fetch('http://tp.cpe.fr:8083/cards',context)
    .then(response => response.json())
    .then((response) => {
      //alert(response)
      console.log(response);
    })
    .catch(error => alert(error));  
  }, [i])

const MarketComponent = ({data}) => (
    
    <div>
        <div>
            <Card display_type='SHORT' data={data} />
        </div>
        <div>
            <Card display_type='FULL' data={data}/>
            <button onClick={console.log('click')}>{data.sellorbuy}</button>
        </div>
    </div>
    
    /*
        <Card>
            <Image src = {img_src} wrapped ui = {false} />
            <Card.Content>
                <Card.Header>hp = {hp} {name} energy = {energy} </Card.Header>
                <Card.Description>
                    {description}
                </Card.Description>
                Family : {family} Affinity : {affinity} id : {id}
            </Card.Content>
            <Card.Content extra>
                    <a>
                        <Icon name = "money bill alternate outline" />
                            {price} $
                    </a>
            </Card.Content>
        </Card>*/
    );

export default MarketComponent;