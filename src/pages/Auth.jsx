import React from 'react';
import { useDispatch } from 'react-redux';
import { userUpdate } from "../core/actions"
import { useNavigate } from 'react-router-dom';

export const Auth = () => {

    const navigate = useNavigate();
    let dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        let context = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:event.target.login.value,password:event.target.pwd.value})
        }
          fetch('http://tp.cpe.fr:8083/auth/',context)
          .then(response => {
            console.log("ooo:",response.status)
            if (response.status == '200'){
                return response.json()
            } else {
                throw('error, pls try again')
            }
        })
        .then((response) => {
            context = {
                method: 'GET'
            }
            fetch('http://tp.cpe.fr:8083/user/'+response,context).then(
                response => {
                    if (response.status == '200'){
                        return response.json()
                    } else {
                        throw('error fetching user')
                    }
                }
            )
            .then((response) => {
                dispatch(userUpdate({id:response.id,username:response.username,account:response.account,cardList:response.cardList,email:response.email,lastName:response.lastName,surName:response.surName}));
                navigate('/menu');
            })
        }).catch(error => alert(error));
    
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