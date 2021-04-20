import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../../redux/user/actions";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn({ ...props }) {
  const [field, setField] = useState({});
  const [screen, setScreen] = useState(false);
  const user = useSelector((state) => state.user);
  const _handleChange = (e) => {
    const { value, name } = e.target;
    setField({
      ...field,
      [name]: value,
    });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    setScreen(true);
    return await props.loginUser(field, setScreen).then((status) => {
      if (status === 200) {
        setField({});
        setScreen(false);
        setTimeout(() => {
          return <Redirect to="/" />;
        }, 1000);
      }
      return props.history.push("/login");
    });
  };
  const classes = useStyles();
  if (user.logged) return <Redirect to="/" />;
  return (
    <Container component="main" maxWidth="xs">
      {user.error && user.error.msg ? <h2>{user.error.msg}</h2> : ""}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={_handleSubmit}>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={user.error && user.error.email ? true : false}
              autoFocus
              value={field.email || ""}
              onChange={_handleChange}
            />
            {user.error && user.error.email ? user.error.email : ""}
          </div>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={user.error && user.error.password ? true : false}
              autoComplete="current-password"
              value={field.password || ""}
              onChange={_handleChange}
            />
            {user.error && user.error.password ? user.error.password : ""}
          </div>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={screen}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default connect(null, {
  loginUser,
})(SignIn);
