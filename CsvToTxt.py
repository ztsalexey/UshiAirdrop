import csv
import json
import itertools
import pickle

items = []

with open('UshiDropAddy.csv') as csvfile:
    csvReader = csv.reader(csvfile)
    for row in csvReader:
        items.append(row[0])
print(json.dumps(items))

with open('pAddresses.txt', "w") as my_output_file:
    [my_output_file.write(json.dumps(items))]
    my_output_file.close()


# Setting initial value of the counter to zero
rowcount = 0
# iterating through the whole file
for row in open('UshiDropAddy.csv'):
    rowcount += 1
   # printing the result
print("Number of addresses:", rowcount)

# _token 0x495f947276749Ce646f68AC8c248420045cb7b5e
# List of IDs 1-5 order
# "89630809129404497424788117478762936113078562676634511015083434405055810240682"
# "89630809129404497424788117478762936113078562676634511015083434406155321868488"
# "89630809129404497424788117478762936113078562676634511015083434407254833496314"
# "89630809129404497424788117478762936113078562676634511015083434408354345124490"
# "89630809129404497424788117478762936113078562676634511015083434409453856752866"

_id = 89630809129404497424788117478762936113078562676634511015083434406155321868488
_amount = 1

amounts = list(itertools.repeat(_amount, rowcount))
print(amounts)

ids = list(itertools.repeat(_id, rowcount))
print(ids)

with open("ids.txt", "w") as outfile:
    outfile.write(",".join(str(item) for item in ids))
