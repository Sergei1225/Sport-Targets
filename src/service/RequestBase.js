export const RequestBase = (baseUrl) => {
    if (!baseUrl) baseUrl = "http://localhost:3001/";

    const simpleReqest = async (
        url = "http://localhost:3001/dataTrening",
        method = "GET",
        body = null,
        headers = { "Content-Type": "application/json" }
    ) => {
        if (body) body = JSON.stringify(body);
        if (url) url = `${baseUrl}${url}`;

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) throw new Error(`An error has occurred, status ${response.status}`);

            return await response.json();
        } catch (e) {
            throw e;
        }
    };

    return { simpleReqest };
};
