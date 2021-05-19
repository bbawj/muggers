import React from "react";
import "../Home.css";
import homePic from "../sticker.webp";

function Home(){
    return(
        <div>
        <div className="home">
            <h1>muggers</h1>
            <h2>a collaborative study platform.</h2>
            <div className = "homeContent">
            <p>Find your study group, or create your own.</p>
            <p>Keep track of tasks, share questions and answers.</p>
            <p>View and brag about your mugging progress.</p>
            </div>
            <div className="homeButtons">
            <button>Sign Up</button>
            <button>Login</button>
            </div>
        </div>
        <img className="homePic" src={homePic} alt="home-pic"/>
        </div>
    )
}

export default Home;