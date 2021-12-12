import requests


for i in range(10):
    for j in range(10):
        for k in range(10):
            payload = {"user_id": i, "location": j, "device": k}
            print(payload)
            r = requests.post("http://localhost:5000/devices", data=payload)
            # print(r.json(), i, j, k)
