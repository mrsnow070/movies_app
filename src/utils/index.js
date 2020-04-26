import AsyncStorage from '@react-native-community/async-storage';

export const fromHTMLtoText = html =>
  html.replace(
    /<\/?[^>]+(>|$)|&#39;|&nbsp;|&raquo;|&oacute;|&nbsp;&raquo;|&ocirc;|&iacute;|&iacute;n|&atilde;|&ntilde;|&iacute;cia|&quot;|&eacute;|&ccedil;|&Ccedil;|&uuml|&eacute;lope|See full summary/g,
    '',
  );

export const getDate = () => {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return (
    hour + ':' + minutes + ':' + seconds + '\n' + mm + '/' + dd + '/' + yyyy
  );
};

export const matchStrings = (str, substr) => {
  const isShort = substr.length > 2;
  const isMatchesFound = str.toLowerCase().indexOf(substr.toLowerCase()) !== -1;

  return isShort && isMatchesFound;
};

export const getRandomID = () =>
  '_' +
  Math.random()
    .toString(36)
    .substr(2, 9);

export const parse = movie => {
  const parsedTitle = /\(([^]+)\)/.exec(movie.channel_title);
  const year = parsedTitle ? parsedTitle[1] : '...';
  const title = parsedTitle
    ? movie.channel_title
        .split(' ')
        .slice(0, -1)
        .join(' ')
    : movie.channel_title;

  const str = fromHTMLtoText(movie.channel_desc);

  const urls = movie.channel_url.split('=>');

  const description =
    str.substring(str[0], str.lastIndexOf('Creator')).trim() ||
    str.substring(str[0], str.lastIndexOf('Director')).trim();

  const director = str
    .substring(str.lastIndexOf('Director'), str.lastIndexOf('Writer'))
    .trim();

  const writers =
    str.substring(str.lastIndexOf('Writer'), str.lastIndexOf('Star')).trim() ||
    str.substring(str.lastIndexOf('Creator'), str.lastIndexOf('Star')).trim();

  const stars = str.substring(str.lastIndexOf('Star')).trim();

  const trailer = movie.channel_trailer
    ? movie.channel_trailer
        .split('watch?v=')
        .join('embed/')
        .concat('?rel=0&showinfo=0&controls=1&fullscreen=1')
    : null;

  return {
    ...movie,
    title,
    year,
    description,
    director,
    writers,
    stars,
    trailer,
    urls,
  };
};

export const parse_2 = movie => {
  let str = fromHTMLtoText(movie.channel_director).trim();
  str = str.replace(/\n/gim, ' ').split(' ');

  let toggle = false;
  if (str.includes('Note')) {
    str = fromHTMLtoText(movie.channel_desc);
    str = str
      .trim()
      .replace(/\n/gim, ' ')
      .split(' ');
    toggle = true;
  }
  const director = str
    .slice(
      str.findIndex(i => i === 'Director:') + 1,
      str.findIndex(i => i === 'Writers:'),
    )
    .join(' ');
  const stars = str.slice(str.findIndex(i => i === 'Stars:') + 1).join(' ');
  const writers = str
    .slice(
      str.findIndex(i => /Writers?/gim.test(i)) + 1,
      str.findIndex(i => i === 'Stars:'),
    )
    .join(' ');

  const description = toggle
    ? // eslint-disable-next-line prettier/prettier
      str
        .slice(
          0,
          str.findIndex(i => i === 'Director:'),
        )
        .join(' ')
    : fromHTMLtoText(movie.channel_desc);

  return {director, str, stars, writers, description};
};

export const getActiveSource = getStateFn => {
  const sources = getStateFn().source.get('sources');
  const activeSource = getStateFn().source.get('activeSource');
  return sources[activeSource];
};

export async function saveTimestampToLocalStorage(movieId, time) {
  if (time % 15 === 0 && time !== 0) {
    try {
      const moviesArray = JSON.parse(
        await AsyncStorage.getItem('watched_movies'),
      );

      if (moviesArray) {
        let newArray = moviesArray.filter(el => el.id !== movieId);
        newArray = newArray.concat([
          {
            id: movieId,
            timeStamp: time,
          },
        ]);
        await AsyncStorage.setItem('watched_movies', JSON.stringify(newArray));
      }
      if (moviesArray === null) {
        await AsyncStorage.setItem(
          'watched_movies',
          JSON.stringify([
            {
              timeStamp: time,
              id: movieId,
            },
          ]),
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export function isString(val) {
  return typeof val === 'string';
}
