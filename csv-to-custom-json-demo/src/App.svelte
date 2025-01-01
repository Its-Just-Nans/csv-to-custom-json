<script>
    import parser from "csv-to-custom-json/front";
    let csv = "num1,num2,num3,num4\n1,2,3,4\n4,5,6,7\n7,8,9,10";
    let parsed = "";
    let errors = "";
    let schema = JSON.stringify(
        {
            num1: "string",
            anObject: {
                num1: "int",
                num2: "int",
                num3: "string",
            },
            anArray: ["num3"],
        },
        null,
        4
    );
    const handleChange = async () => {
        try {
            const schemaObj = JSON.parse(schema);
            parsed = await parser(csv.split("\n"), schemaObj, {
                avoidVoidLine: true,
            });
            errors = [];
        } catch (e) {
            errors = "Error parsing";
        }
    };
    setTimeout(handleChange, 500);
</script>

<div style="text-align: center;">
    <h1 id="title">Demo of csv-to-custom-json</h1>
    <p class="inline">Made with</p>
    <a style="color:orange" class="link" href="https://svelte.dev" target="_blank">
        <p class="inline">Svelte</p>
        <img class="inline logo" src="https://svelte.dev/favicon.png" alt="" />
    </a>
    <p class="inline">!</p>
    <p class="inline">
        Check code <a class="link" href="https://github.com/Its-Just-Nans/csv-to-custom-json">here</a>
    </p>
</div>
<table>
    <thead>
        <tr>
            <th>
                <textarea
                    class="textarea"
                    on:change={handleChange}
                    on:click={handleChange}
                    on:keyup={handleChange}
                    placeholder="Your csv here"
                    bind:value={csv}
                />
                <!-- {#if working != true}
					<button
						on:click={(event) => {
							event.preventDefault();
							handleSubmit();
						}}>Send</button
					>
				{:else}
					<p style="font-weight: bold;">Loading...</p>
				{/if} -->
            </th>
            <th>
                <pre id="parsed-res">{JSON.stringify(parsed, null, 4)}</pre>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="results">
                <h2 class="titleCol">Schema</h2>
                <textarea
                    class="textarea"
                    on:change={handleChange}
                    on:click={handleChange}
                    on:keyup={handleChange}
                    placeholder="Your schema here"
                    bind:value={schema}
                />
            </td>
            <td class="error">
                <h2 class="titleCol">Errors</h2>
                <p>{errors}</p>
            </td>
        </tr>
    </tbody>
</table>

<style>
    #title {
        margin-bottom: 10px;
        margin-top: 10px;
    }
    table {
        width: 100%;
    }
    th {
        width: 50%;
    }
    .error > p {
        color: red;
    }
    td {
        width: 50%;
    }
    .results {
        flex: 1;
    }
    .inline {
        display: inline;
    }
    .titleCol {
        text-align: center;
        margin: 0px;
    }
    .textarea {
        width: 100%;
        max-width: 100%;
        min-height: 400px;
    }
    .logo {
        height: 20px;
        vertical-align: middle;
    }
    .link:visited {
        color: initial;
    }
    .link {
        font-weight: bold;
        text-decoration: none;
    }
    #parsed-res {
        text-align: initial;
        font-family: monospace;
        height: 400px;
        overflow-y: scroll;
        border: 1px solid black;
    }
    pre {
        margin: 0px;
    }
</style>
