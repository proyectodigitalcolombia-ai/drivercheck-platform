CREATE TABLE drivers (

id SERIAL PRIMARY KEY,

document VARCHAR(50),

police_status VARCHAR(100),

procuraduria_status VARCHAR(100),

risk_score INT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
