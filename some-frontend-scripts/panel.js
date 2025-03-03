const JSisEnabledDisplayHtml = () => {
	document.getElementsByTagName("body")[0].style.display = "flex"
};
JSisEnabledDisplayHtml();
const passpengu = () => {
	let e = document.getElementsByTagName("*"),
		l = e.length;
	for (let a = 0; a < l; a++) "SCRIPT" !== e[a].tagName && "BODY" !== e[a].tagName && (e[a].style.display = "none");
	let t = prompt("Enter the password:");
	if (null !== t && "penguin" === t)
		for (let s = 0; s < l; s++) "SCRIPT" !== e[s].tagName && "BODY" !== e[s].tagName && (e[s].style.display = "block");
	else alert("Access denied!"), window.location.href = "about:blank"
};
passpengu();