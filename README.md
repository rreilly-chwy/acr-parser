# acr-parser

Get a csv dump of acr data embedded in event metadata with the following query (update the dates for `created_at`): 

```
SELECT apt.id, apt.created_at - '05:00:00'::time, e.code, e.metadata, apt_time.start_time - '05:00:00'::time
FROM stark_appointment_service.appointment apt
INNER JOIN stark_appointment_service.appointment_event e
ON apt.id = e.appointment_id
RIGHT JOIN stark_appointment_service.appointment_time apt_time
ON apt_time.id = apt.time_id
WHERE apt.created_at > '2022-02-01 5:00:00.000000' AND apt.created_at < '2022-04-30 5:00:00.000000'
AND (e.code = 'DISPOSED_OK' OR e.code = 'DISPOSED_COMPASSION' or e.code = 'DISPOSED_NO_SHOW')
```

Name the csv dump `acr_dump.csv` and put it on the root level of this project. Run `npm install` and then `npm start`.

If it fails, there is probably bad data. Reach out to me, rreilly, and I'll help you find where the bad data is so you can kill it. 

