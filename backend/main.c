/*
 * "It's Fine" API server - responds "it's fine" to any question.
 * Uses GNU libmicrohttpd. Build: make. Run: ./server
 */

#include <microhttpd.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

#define PORT 8080
#define ANSWER_JSON "{\"answer\":\"it's fine\"}"

static enum MHD_Result
answer_request(void *cls,
               struct MHD_Connection *connection,
               const char *url,
               const char *method,
               const char *version,
               const char *upload_data,
               size_t *upload_data_size,
               void **con_cls)
{
	(void)cls;
	(void)version;
	(void)upload_data;
	(void)upload_data_size;
	(void)con_cls;

	/* Only handle /api/answer */
	if (strcmp(url, "/api/answer") != 0) {
		struct MHD_Response *resp = MHD_create_response_from_buffer(0, "", MHD_RESPMEM_PERSISTENT);
		enum MHD_Result ret = MHD_queue_response(connection, MHD_HTTP_NOT_FOUND, resp);
		MHD_destroy_response(resp);
		return ret;
	}

	/* CORS headers for all responses */
#define CORS_ORIGIN "Access-Control-Allow-Origin"
#define CORS_ORIGIN_VAL "*"
#define CORS_METHODS "Access-Control-Allow-Methods"
#define CORS_METHODS_VAL "GET, OPTIONS"
#define CORS_HEADERS "Access-Control-Allow-Headers"
#define CORS_HEADERS_VAL "Content-Type"

	if (strcmp(method, "OPTIONS") == 0) {
		struct MHD_Response *resp = MHD_create_response_from_buffer(0, NULL, MHD_RESPMEM_PERSISTENT);
		MHD_add_response_header(resp, CORS_ORIGIN, CORS_ORIGIN_VAL);
		MHD_add_response_header(resp, CORS_METHODS, CORS_METHODS_VAL);
		MHD_add_response_header(resp, CORS_HEADERS, CORS_HEADERS_VAL);
		enum MHD_Result ret = MHD_queue_response(connection, MHD_HTTP_NO_CONTENT, resp);
		MHD_destroy_response(resp);
		return ret;
	}

	if (strcmp(method, "GET") != 0) {
		struct MHD_Response *resp = MHD_create_response_from_buffer(0, "", MHD_RESPMEM_PERSISTENT);
		enum MHD_Result ret = MHD_queue_response(connection, MHD_HTTP_METHOD_NOT_ALLOWED, resp);
		MHD_destroy_response(resp);
		return ret;
	}

	/* GET /api/answer -> always "it's fine" */
	size_t len = strlen(ANSWER_JSON);
	struct MHD_Response *resp = MHD_create_response_from_buffer(
		len, (void *)ANSWER_JSON, MHD_RESPMEM_PERSISTENT);
	MHD_add_response_header(resp, "Content-Type", "application/json");
	MHD_add_response_header(resp, CORS_ORIGIN, CORS_ORIGIN_VAL);
	MHD_add_response_header(resp, CORS_METHODS, CORS_METHODS_VAL);

	enum MHD_Result ret = MHD_queue_response(connection, MHD_HTTP_OK, resp);
	MHD_destroy_response(resp);
	return ret;
}

int main(void)
{
	struct MHD_Daemon *daemon = MHD_start_daemon(
		MHD_USE_INTERNAL_POLLING_THREAD,
		PORT,
		NULL, NULL,
		&answer_request, NULL,
		MHD_OPTION_END);

	if (daemon == NULL) {
		fprintf(stderr, "Failed to start server on port %d\n", PORT);
		return 1;
	}

	printf("It's Fine API listening on http://localhost:%d\n", PORT);
	printf("GET /api/answer?q=... -> {\"answer\":\"it's fine\"}\n");
	printf("Press Ctrl+C to stop.\n");

	while (1)
		sleep(3600);

	MHD_stop_daemon(daemon);
	return 0;
}
