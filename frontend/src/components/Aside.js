import { getProducts } from "../api";

const Aside = {
  render: async () => {
    const products = await getProducts("");
    console.log(products)
    return `
   <div class="aside-header">
    <div>SHOP BY CATEGORY</div>
    <button class="aside-close-button" id="aside-close-button">x</button>
  </div>
  ${
    products
    .map(
      (product) => `  
      <div class="aside-body">
      <ul class="categories">
        <li>
          <a href="/#/?q=${product.category}"
            >${product.category
            }
            <span><i class="fa fa-chevron-right"></i></span>
          </a>
        </li>
      </ul>
    </div>
  `
    )
    .join('\n')}`;
  },
  after_render: async () => {
    document.getElementById('aside-container').classList.remove('open');
    document
      .getElementById('aside-close-button')
      .addEventListener('click', async () => {
        document.getElementById('aside-container').classList.remove('open');
      });
  },
};

export default Aside;
