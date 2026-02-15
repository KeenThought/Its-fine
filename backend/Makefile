CC = gcc
CFLAGS = -Wall -Wextra -O2
LDFLAGS = -lmicrohttpd

server: main.c
	$(CC) $(CFLAGS) -o server main.c $(LDFLAGS)

clean:
	rm -f server

.PHONY: clean
