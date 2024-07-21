import './Home.css'


function Home() {
    return (
    <div>
        <div class = "navbar">
            <header>House Of Cards</header>
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>Sign Out</li>
            </ul>
        </div>
       	<div class="games">
          	<div>Game 1</div>
  			<div>Game 2</div>
 			<div>Game 3</div>
  			<div>Game 4</div>
        </div>
        <div class = "footer">
            <p>Contact Us<p>
        </div>
    </div>
    )
}

export default Home;