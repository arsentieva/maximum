const logoutBtn = document.getElementById('logout');

const logout = function(){
    localStorage.removeItem("MAXIMUM_ACCESS_TOKEN");
    localStorage.removeItem("MAXIMUM_CURRENT_USER_ID");
    localStorage.removeItem("MAXIMUM_STORY_ID");
}

logoutBtn.addEventListener("click", event => {
    logout();
});
