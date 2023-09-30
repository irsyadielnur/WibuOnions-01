class searchAnime extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#searchInput').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
    .formCari {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .formCari input {
        border-radius: 20px 0 0 20px;
        width: 25%;
        padding: 10px 13px;
        margin-right: 4px;
        border: 1.5px solid rgb(255,193,7);
        background-color: rgb(248,249,250);
        transition: width .3s ease-in-out;
    }

    .formCari input:focus {
       outline: 0;
       width: 50%;
       background-color: rgb(248, 227, 168);
       box-shadow: 0 0 3px rgba(248, 227, 168, 1);
    }

    .formCari button {
        position: relative;
        border-radius: 0 20px 20px 0;
        width: 6rem;
        font-weight: 700;
        font-size: 15px;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
        border: 1.5px solid rgb(255,193,7);
        transition: .2s;
    }

    .formCari button:hover {
        background-color: rgb(255,193,7);
        color: rgb(33,37,41);
    }

    @media screen and (max-width: 576px) {
      .formCari {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .formCari input {
        border-radius: 20px;
        width: 50%;
        margin-bottom: 1rem;
    }

    .formCari input:focus {
       width: 90%;
    }

     .formCari button {
        border-radius: 20px;
        width: 6rem;
        height: 2rem;
    }
    }
    </style>
    <form class="formCari" role="search">
        <input id="searchInput" type="search" placeholder="Search Anime..." aria-label="Search" />
        <button id="searchBtn" type="submit">Search</button>
    </form>`;

    this.shadowDOM.querySelector('#searchBtn').addEventListener('click', this._clickEvent);
  }
}

customElements.define('search-anime', searchAnime);
