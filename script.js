//Color
  //Popup
    function colorbtn() {
    document.getElementById("ccolor").classList.toggle("cshow");
    }
  //Change Color Light
    //Change Principal Color Light "PCL"
      var pcl = document.getElementById('pcl');
      function cpcl() {
        document.body.style.setProperty('--pcl', pcl.value);
        localStorage.setItem('pcl', pcl.value);
      }
      var vpcl = localStorage.getItem('pcl')
      if (localStorage.getItem('pcl')){
        document.body.style.setProperty('--pcl', vpcl);
      }
    //Change Secondary Color Light "SCL" scl
      var scl = document.getElementById('scl');
      function cscl() {
        document.body.style.setProperty('--scl', scl.value);
        localStorage.setItem('scl', scl.value);
      }
      var vscl = localStorage.getItem('scl')
      if (localStorage.getItem('scl')){
        document.body.style.setProperty('--scl', vscl);
      }
    //Change Background Color Light "BGCL" bgcl
      var bgcl = document.getElementById('bgcl');
      function cbgcl() {
        document.body.style.setProperty('--bgcl', bgcl.value);
        localStorage.setItem('bgcl', bgcl.value);
      }
      var vbgcl = localStorage.getItem('bgcl')
      if (localStorage.getItem('bgcl')){
        document.body.style.setProperty('--bgcl', vbgcl);
      }


    //Change Principal Color Night "PCN" pcn
      var pcn = document.getElementById('pcn');
      function cpcn() {
        document.body.style.setProperty('--pcn', pcn.value);
        localStorage.setItem('pcn', pcn.value);
      }
      var vpcn = localStorage.getItem('pcn')
      if (localStorage.getItem('pcn')){
        document.body.style.setProperty('--pcn', vpcn);
      }
    //Change Secondary Color Night "SCN" scn
      var scn = document.getElementById('scn');
      function cscn() {
        document.body.style.setProperty('--scn', scn.value);
        localStorage.setItem('scn', scn.value);
      }
      var vscn = localStorage.getItem('scn')
      if (localStorage.getItem('scn')){
        document.body.style.setProperty('--scn', vscn);
      }
    //Change Background Color Night "BGCN" bgcn
      var bgcn = document.getElementById('bgcn');
      function cbgcn() {
        document.body.style.setProperty('--bgcn', bgcn.value);
        localStorage.setItem('bgcn', bgcn.value);
      }
      var vbgcn = localStorage.getItem('bgcn')
      if (localStorage.getItem('bgcn')){
        document.body.style.setProperty('--bgcn', vbgcn);
      }

//Mode
  const btnmode = document.getElementById('mode');

  btnmode.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnmode.classList.toggle('mactive');

    // Guardamos el modo en localstorage.
    if(document.body.classList.contains('dark')){
      localStorage.setItem('dark-mode', 'true');
    } else {
      localStorage.setItem('dark-mode', 'false');
    }
  });

  if(localStorage.getItem('dark-mode') === 'true'){
    document.body.classList.add('dark');
    btnmode.classList.add('mactive');
  } else {
    document.body.classList.remove('dark');
    btnmode.classList.remove('mactive');
  }

//Bookmark
  const modal = document.getElementById("modal");
  const modalShow = document.getElementById("show-modal");
  const modalClose = document.getElementById("close-model");
  const bookmarkForm = document.getElementById("bookmark-form");
  const websiteNameEl = document.getElementById("website-name");
  const websiteUrlEl = document.getElementById("website-url");
  const bookmarksContainer = document.getElementById("bookmarks-container");

  let bookmarks = [];

  // Show Modal , focus in Input
  let showModal = () => {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
  };
  // Close Modal
  let closeModal = () => modal.classList.remove("show-modal");

  // Modal Events Listeners
  modalShow.addEventListener("click", showModal);
  modalClose.addEventListener("click", closeModal);
  // close when click outside the modal
  window.addEventListener("click", (e) => (e.target === modal ? closeModal() : false));

  // Validate Form
  let Validate = (nameValue, urlValue) => {
    const expression =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
      alert("please submit values for both fields.");
      return false;
    }
    if (!urlValue.match(regex)) {
      alert("please provide a valid web address");
      return false;
    }
    // Valid
    return true;
  };

  // Build Bookmarks DOM
  let buildBookmarks = () => {
    // Remove all bookmark elements
    bookmarksContainer.textContent = "";
    // Build Items
    bookmarks.forEach((bookmark) => {
      const { name, url } = bookmark;

      //Link Cyan
      const item = document.createElement("div")
      item.classList.add("bitem");

      const link = document.createElement("a");
      link.classList.add("blink");
      link.setAttribute("href", `${url}`);
      link.setAttribute("target", "_blank");
      link.textContent = name;

      //Close Icon PCLN
      const closeIcon = document.createElement("i");
      closeIcon.classList.add("fas", "fa-times");
      closeIcon.setAttribute("title", "Delete Bookmark");
      closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);

      //Favicon Green
      const favicon = document.createElement("img");
      favicon.classList.add("bimg");
      favicon.setAttribute("src", `https://www.google.com/s2/favicons?domain=${url}`);
      favicon.setAttribute("alt", "favicon");


      // Apend bookmark container
      item.append(closeIcon, favicon, link);
      bookmarksContainer.appendChild(item);
    });
  };

  //  Fetch Bookmarks
  let fetchBookmarks = () => {
    // Get Bookmarks from localStorage if available
    if (localStorage.getItem("bookmarks")) {
      bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    } else {
      // Create bookmarks array in localStorage
      bookmarks = [
        {
          name: "Duck Duck Go",
          url: "https://duckduckgo.com",
        },
        {
          name: "Youtube",
          url: "https://www.youtube.com",
        },
        {
          name: "Google",
          url: "https://www.google.com",
        },
        {
          name: "Dashboard v1.0",
          url: "https://king-pacaya.github.io/dashboard-v1.0/",
        }
      ];
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    buildBookmarks();
  };

  // Delete Bookmark
  let deleteBookmark = (url) => {
    bookmarks.forEach((bookmark, i) => {
      if (bookmark.url === url) {
        bookmarks.splice(i, 1);
      }
    });
    //   Update bookmarks array in localStorage, re-populate DOM
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
  };
  // Handle Data from form
  let storeBookmark = (e) => {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
      urlValue = `https://${urlValue}`;
    }

    if (!Validate(nameValue, urlValue)) {
      return false;
    }
    const bookmark = {
      name: nameValue,
      url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
  };

  // Event Listener
  bookmarkForm.addEventListener("submit", storeBookmark);

  // on Load , Fetch Bookmarks
  fetchBookmarks();

//Lock
function lock(password, lsEnt) {
  if(password === undefined) {
    return;
  }
  if(lsEnt !== undefined) {
    if(localStorage[lsEnt] == "y") {
      return;
    }
  }
  var page = document.querySelector("html");
  var oldDisplay = page.style.display;
  page.style.display = "none";
  var enteredPass = prompt("What is the password to this page?");
  if(enteredPass === password) {
    page.style.display = oldDisplay;
    if(lsEnt !== undefined) {
      localStorage[lsEnt] = "y";
    }
  } else {
    alert("Incorrect. Access denied.");
  }
}
lock("pass");