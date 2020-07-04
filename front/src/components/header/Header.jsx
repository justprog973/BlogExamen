import React from 'react';


export default Header = () =>{
    return<div className="header-body">
            <div className="card-header-body">
                <h1>Vous avez une histoire ?</h1>
                <p>Ne la garder pas pour vous voyons !</p>
                <Button
                    as="a"
                    href="#" 
                    color={'#fff'}
                    bg={'rgb(121, 183, 187)'}
                    br={3}
                    width={170}
                    height={42}
                >Raconter</Button>
            </div>
        </div>
}