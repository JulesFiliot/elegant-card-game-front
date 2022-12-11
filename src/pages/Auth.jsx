import React from 'react';
import { useDispatch } from 'react-redux';
import { userUpdate } from "../core/actions"
import { useNavigate } from 'react-router-dom';

export const Auth = () => {

    const navigate = useNavigate();
    let dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.login.value);
        console.log(event.target.pwd.value)
        let context = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:event.target.login.value,password:event.target.pwd.value})
        }
          fetch('http://tp.cpe.fr:8083/auth/',context)
          .then(response => {
            if (response.status == '200'){
                alert('good')
                return response.json()
//                console.log(response.json())
            } else {
                throw('error, pls try again')
            }
        })
        .then((response) => {
            alert(response)
            //fetch user info thx to id
            context = {
                method: 'GET'
            }
            fetch('http://tp.cpe.fr:8083/user/'+response,context).then(
                response => {
                    console.log('usrfetch')
                    if (response.status == '200'){
                        return response.json()
                    } else {
                        throw('error fetching user')
                    }
                }
            )
            .then((response) => {
                alert(response.login);
                console.log(response.login)

                dispatch(userUpdate({id:response.id,username:response.username,account:response.account,cardList:response.cardList,email:response.email,lastName:response.lastName,surName:response.surName}));
                navigate('/menu');
                //it works, but why info is lost on refresh ? maybe useeffect in main
            })
        })
          //.then((response) => {
            //alert(response.status)
            //console.log(response);
            /*const user = response.find(e =>( e.login === event.target.login.value && e.pwd === event.target.pwd.value ));
            if (user) {
              alert('that is good my friend');
              dispatch(userUpdate({name:event.target.login.value}));
              //redirect to menu here
            } else {
              alert('nope')
            }*/
         // })
          .catch(error => alert(error));
    
      }
    return (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="login" className="form-label">Login</label>
            <input type="text" className="form-control" id="login" aria-describedby="loginHelp"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">Password</label>
            <input type="password" className="form-control" id="pwd"></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}