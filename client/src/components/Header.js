import {useState} from 'react'

function Header(){
    const [ buttonInfo, setButtonInfo ] = useState('Job Site')
    return(
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <h1 className="navbar-brand">Pound Sand</h1>
                <div class="btn-group">
                    <button class="btn btn-secondary btn-lg" type="button">
                        {buttonInfo}
                    </button>
                    <button type="button" class="btn btn-lg btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li onClick={() => setButtonInfo("Action")}>Action</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;