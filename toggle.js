document.querySelectorAll('input[type="password"]').forEach(input => {
  input.setAttribute("type", "text");
  input.setAttribute("data-from-extension", "true");
});
