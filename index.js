const fs = require('fs');
const path = './README.md';

// Fonction pour obtenir la date du jour sous la forme "Lun 23 Octobre 2023"
function getFormattedDate() {
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  const date = new Date();
  date.setHours(date.getHours() + 2);
  const day = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${dayOfMonth} ${month} ${year}`;
}

// Lecture du fichier
fs.readFile(path, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  // Remplacement de la ligne "_Last Modified: ..."
  const result = data.replace(/_Last Modified: .+?_/, `_Last Modified: ${getFormattedDate()}_`);

  // Écriture du nouveau contenu dans le fichier
  fs.writeFile(path, result, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
