# Schema Information

## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users)
title       | string    | not null
spots       | integer   |

## event_joins
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
event_id    | integer   | not null, foreign key (references events)
attender_id | integer   | not null, foreign key (references users)

## travel_plans
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
traveller_id | integer   | not null, foreign key (references users)
dest_id      | integer   | not null, foreign key (references cities)
description  | text      |
start_time   | date      | not null
end_time     | date      | not null

## cities
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
region      | string    |
country     | string    | not null
latitude    | float     | not null
longitude   | float     | not null

## addresses
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
address     | string    | not null
postal_code | integer   | not null

## references
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
giver_id    | integer   | not null, foreign key (references users)
getter_id   | integer   | not null, foreign key (references users)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
name            | string    | not null
about           | text      |
password_digest | string    | not null
session_token   | string    | not null, unique
status          | string    | not null
