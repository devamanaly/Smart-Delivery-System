const App = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

App.get('/', (req, res) => {
    res.send("Smart delivery is running");
});

App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
