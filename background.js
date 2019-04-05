function reminders(request, sender, sendResponse) {
  const { type, url, timestamp, curs, ora, club } = request;

  switch (type) {
    case "ALARM_GET_ALL":
      chrome.alarms.getAll(res => 
        sendResponse(res)
      )
    break;
    case "ALARM_CREATE":
      const date = new Date(timestamp);
      const alarmName = `${curs}@${club}-(${date.toLocaleString()})`;
      chrome.alarms.create(alarmName, { when: date.getTime() });

      chrome.alarms.onAlarm.addListener(alarm => {
        if (alarm.name === alarmName) {
          openURL(url, curs, ora, club);
        }
      });

      sendResponse({ ok: "yes" });
    break;
  }  
}

function openURL(url, curs, ora, club) {
  chrome.tabs.query({
    url: url
  }, tabs => {
    if (tabs.length === 0) {
      chrome.tabs.create({ url: url, active: true });
    } else {
      // Focus first match
      chrome.tabs.update(tabs[0].id, { active: true });
    }
  });

  alert(`Fa rezervare la \r\n ${ora} \r\n ${curs} \r\n la ${club}.`);
}


chrome.runtime.onMessageExternal.addListener(reminders);