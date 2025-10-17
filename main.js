(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var form = document.querySelector("#github-user-${seed}");
    var usernameInput = document.querySelector("#github-username");
    var createdAtEl = document.querySelector("#github-created-at");
    var ageEl = document.querySelector("#github-account-age");
    var statusEl = document.querySelector("#github-status");
    if(!form || !usernameInput || !createdAtEl || !ageEl || !statusEl) return;

    function computeAgeYears(createdDate){
      var now = new Date();
      var years = now.getUTCFullYear() - createdDate.getUTCFullYear();
      var m = now.getUTCMonth() - createdDate.getUTCMonth();
      if (m < 0 || (m === 0 && now.getUTCDate() < createdDate.getUTCDate())) {
        years--;
      }
      return years;
    }

    form.addEventListener('submit', async function(e){
      e.preventDefault();
      var username = (usernameInput.value || '').trim();
      if(!username){
        createdAtEl.textContent = "Account created at: -";
        if(ageEl) ageEl.textContent = "Account age: -";
        return;
      }
      var token = (new URLSearchParams(window.location.search)).get('token');
      var opts = {};
      if(token){
        opts.headers = { 'Authorization': 'token ' + token };
      }
      if(statusEl) statusEl.textContent = "Fetching data for " + username + "...";
      try{
        var res = await fetch(apiBase + username, opts);
        if(!res.ok){
          if(statusEl) statusEl.textContent = "Could not fetch data for " + username;
          return;
        }
        var data = await res.json();
        if(data && data.created_at){
          var date = new Date(data.created_at);
          var isoDate = date.toISOString().slice(0,10);
          createdAtEl.textContent = "Account created at: " + isoDate + " UTC";
          var age = computeAgeYears(date);
          if(ageEl){
            ageEl.textContent = "Account age: " + age + " year" + (age === 1 ? "" : "s");
          }
          if(statusEl) statusEl.textContent = "Fetched data for " + username;
        }
      } catch(err){
        if(statusEl) statusEl.textContent = "Error fetching data for " + username;
      }
    });
  });
})();