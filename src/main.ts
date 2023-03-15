(function () {
  const brandvoiseReviewsContainer =
    document.getElementById('brandvoise-reviews');
  const brandvoiseScript = document.getElementById('brandvoise-script');

  if (!brandvoiseReviewsContainer || !brandvoiseScript) {
    console.error('Brandvoise reviews container or script was not found');
  } else {
    const brandvoiseAPI =
      'https://brandvoise-services-graphql-kjj7y2qq2a-nw.a.run.app/graphql';
    const userId = brandvoiseScript.getAttribute('data-id');

    const getIntegrationInfo = async () => {
      const res = await fetch(brandvoiseAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetIntegrationInfo($userId: String!,$url:String!) {
              getIntegrationInfo(userId:$userId,url:$url) {
                _id
                userId
                productId
                conditionType
                conditionValue
                intergrationStatus
                productInfo {
                  _id
                  name
                }
              }
            }
          `,
          variables: {
            url: window.location.href,
            userId: userId,
          },
        }),
      });

      const resJson = await res.json();
      return resJson;
    };

    const createIframe = async () => {
      const res = await getIntegrationInfo();
      const integrationInfo = res?.data?.getIntegrationInfo;
      if (integrationInfo && integrationInfo.intergrationStatus === 'ACTIVE') {
        const { productId, userId, productInfo } = integrationInfo;
        const iframe = document.createElement('iframe');
        const iframSrc = `https://brandvoise-app-git-feat-brandvoise-embed-brandvoise.vercel.app/public/users/${userId}/embed?showDescribeText=true&sortByMostHelpful=true&productId=${productId}&pageLimit=4&showBrandInfo=true`;
        iframe.setAttribute('src', iframSrc);
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '600px');
        iframe.setAttribute('title', `${productInfo?.name} | Brandvoise`);
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('allowFullScreen', 'true');
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute(
          'allow',
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        );
        brandvoiseReviewsContainer.appendChild(iframe);
      }
    };
    createIframe();
  }
})();

export {};
