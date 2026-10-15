import app from './index';

const port = 5000;

app.listen(port, '0.0.0.0', (): void => {
  console.log(`Server running on port ${port}`);
});
