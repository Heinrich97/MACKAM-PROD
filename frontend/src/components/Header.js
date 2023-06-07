import { getUserInfo } from '../localStorage';
import { parseRequestUrl } from '../utils';

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    return ` 
        <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
        </head>
          <nav>
             <div class="menu-icon">
                <span class="fas fa-bars"></span>
             </div>
             <div class="logo">
                <a href="/#/">MACKAM</a>
             </div>
             <form id="search-form">
                <input type="search" class="search-data" placeholder="Search" id="search-data" value="${value || ''}">
                <button type="submit" class="fas fa-search"></button>
            </form>
            <button id="aside-open-button" class="aside-open-button">
            &#9776;
            </button>
             <div class="nav-items" style="position:absolute; right:0;">
             ${
              name
                ? `<a href="/#/profile">${name}</a>`
                : `<a href="/#/signin">Sign-In</a>`
             }    
              <a href="/#/cart">Cart</a>
              ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ''}
             </div>
             <div class="search-icon">
                <span class="fas fa-search"></span>
             </div>
             <div>
             <div class="cancel-icon">
                <span class="fas fa-times"></span>
             </div>
          </nav>
          
    </html>`;
  },
  after_render: () => {
    
    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('search-data').value;
        console.log(searchKeyword)
        document.location.hash = `/?search-data=${searchKeyword}`;
      });

    document
      .getElementById('aside-open-button')
      .addEventListener('click', async () => {
        document.getElementById('aside-container').classList.add('open');
      });
             const menuBtn = document.querySelector(".menu-icon span");
             const searchBtn = document.querySelector(".search-icon");
             const cancelBtn = document.querySelector(".cancel-icon");
             const items = document.querySelector(".nav-items");
             const form = document.querySelector("form");
             menuBtn.onclick = ()=>{
               items.classList.add("active");
               menuBtn.classList.add("hide");
               searchBtn.classList.add("hide");
               cancelBtn.classList.add("show");
             }
             cancelBtn.onclick = ()=>{
               items.classList.remove("active");
               menuBtn.classList.remove("hide");
               searchBtn.classList.remove("hide");
               cancelBtn.classList.remove("show");
               form.classList.remove("active");
               cancelBtn.style.color = "#ff3d00";
             }
             searchBtn.onclick = ()=>{
               form.classList.add("active");
               searchBtn.classList.add("hide");
               cancelBtn.classList.add("show");
             }
  },
};
export default Header;
