const OAuthButton = () => {
  const onClick = () => {
    const protocol = window.location.protocol;
    const hostName = window.location.hostname;
    const port = window.location.port;
    let url = protocol + '//' + hostName + (port ? ':' + port : '') + '/test';
    window.location.href =
      'https://accounts.google.com/o/oauth2/auth?client_id=917034651706-impnf3jg1g4hh6des3ea5iuibtmggms8.apps.googleusercontent.com&redirect_uri=' +
      url +
      '&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
  };
  return <button onClick={onClick}>oAuth 버튼</button>;
};

export default OAuthButton;
