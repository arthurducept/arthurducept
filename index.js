const fs = require('fs');

const LOCALIZATION = {
  fr: {
    days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    months: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
  },
  en: {
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
};

function main() {
  updateFile('./README.md', 'fr');
  updateFile('./README-EN.md', 'en');
}

// Fonction pour obtenir la date du jour sous la forme 'Lun 23 Octobre 2023'
function getFormattedDate(days, months) {
  const date = new Date();
  date.setHours(date.getHours() + 2);
  const day = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${dayOfMonth} ${month} ${year}`;
}

function updateFile(filePath, lang) {
  // Lecture du fichier
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    const months = LOCALIZATION[lang].months;
    const days = LOCALIZATION[lang].days;

    // Remplacement de la ligne '_Last Updated: ...'
    const result = data.replace(/_Last Updated: .+?_/, `_Last Updated: ${getFormattedDate(days, months)}_`);

    // Écriture du nouveau contenu dans le fichier
    fs.writeFile(filePath, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

main();
